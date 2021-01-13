using System;
using System.Buffers.Text;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace MyAngularAPP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private IConfiguration configuration;
        public FileController(IConfiguration iConfig)
        {
            configuration = iConfig;
        }

        [HttpGet]
        [Route("GetFiles")]
        public ActionResult GetFile(string root)
        {
            string path = configuration.GetValue<string>("Settings:path");
            if (string.IsNullOrEmpty(root))
            {
                root = path;
            }
            // Get all subdirectories
            string[] subdirectoryEntries = Directory.GetDirectories(root);
            string[] files = Directory.GetFiles(root);

            var allfiles = subdirectoryEntries.Concat(files);



            return Ok(allfiles);
        }
        public void GetSubDirectories()

        {

            string root = @"D:\\PrimePay\";

            // Get all subdirectories

            string[] subdirectoryEntries = Directory.GetDirectories(root);

            // Loop through them to see if they have any other subdirectories

            foreach (string subdirectory in subdirectoryEntries)

                LoadSubDirs(subdirectory);

        }

        private void LoadSubDirs(string dir)

        {

            Console.WriteLine(dir);

            string[] subdirectoryEntries = Directory.GetDirectories(dir);

            foreach (string subdirectory in subdirectoryEntries)

            {

                LoadSubDirs(subdirectory);

            }

        }


        [HttpGet]
        [Route("GetImageBinaryFile")]
        public byte[] GetImageBinaryFile(string filename)
        {
            byte[] bytes;
            using (FileStream file = new FileStream(filename.Substring(0, filename.Length-1), FileMode.Open, FileAccess.Read))
            {
                bytes = new byte[file.Length];
                file.Read(bytes, 0, (int)file.Length);
            }

            return bytes;

        }

        [HttpGet]
        [Route("GetBinaryFile")]
        public IActionResult GetBinaryFile(string filename)
        {
            byte[] bytes;
            using (FileStream file = new FileStream(filename.Substring(0, filename.Length - 1), FileMode.Open, FileAccess.Read))
            {
                bytes = new byte[file.Length];
                file.Read(bytes, 0, (int)file.Length);
            }

            return File(bytes, "application/pdf");
        }
    }
}
