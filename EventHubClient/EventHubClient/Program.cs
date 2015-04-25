using System;
using System.Text;
using System.Threading.Tasks;
using Microsoft.ServiceBus.Messaging;
using Newtonsoft.Json;

namespace MyApp
{
    class Program
    {
        private const string EventHubName = "collisiondetection";
        private const string ConnectionString = "Endpoint=sb://collisiondetection-ns.servicebus.windows.net/;SharedAccessKeyName=SendRule;SharedAccessKey=xmEOMGlBO7+NsLFKsWrH5Ejrh7U01TS+Yi01IuOYfGc=";

        static void Main(string[] args)
        {
            Console.WriteLine("Press Ctrl-C to stop the sender process");
            Console.WriteLine("Press Enter to start now");
            Console.ReadLine();
            SendingRandomMessages().Wait();
        }

        static async Task SendingRandomMessages()
        {
            var eventHubClient = EventHubClient.CreateFromConnectionString(ConnectionString, EventHubName);
            while (true)
            {
                try
                {
                    var message = new TelemetryData
                    {
                        Id = 1,
                        Xcoordinate = 3,
                        Ycoordinate = 4
                    };
                    var serializedData = JsonConvert.SerializeObject(message);
                    Console.WriteLine("{0} > Sending message: {1}", DateTime.Now, serializedData);
                    await eventHubClient.SendAsync(new EventData(Encoding.UTF8.GetBytes(serializedData)));
                }
                catch (Exception exception)
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine("{0} > Exception: {1}", DateTime.Now, exception.Message);
                    Console.ResetColor();
                }

                await Task.Delay(200);
            }
        }

        private class TelemetryData
        {
            public int Id { get; set; }
            public int Xcoordinate { get; set; }
            public int Ycoordinate { get; set; }
        }
    }
}
