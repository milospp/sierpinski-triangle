using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sierpinski_Triangle
{
    internal class Cordinates
    {
        private int width;
        private int height;

        public Cordinates(int width, int height)
        {
            this.width = width;
            this.height = height;
        }

        public double X { get; set; }
        public double Y { get; set; }

    }

    internal class Triangle
    {
        public int X { get; set; }
        public int Y { get; set; }
        public int Length { get; set; }

        public Triangle(int x, int y, int length)
        {
            X = x;
            Y = y;
            Length = length;
        }
    }

    internal class SierpinskiTriangle
    {
        int main_width;
        int main_height;
        List<Triangle> triangles;

        private Cordinates getConsoleSize()
        {
            this.main_width = Console.WindowWidth;
            this.main_height = Console.WindowHeight;
            return new Cordinates(main_width, main_height);
        }

        public SierpinskiTriangle()
        {
            this.triangles = new List<Triangle>();
            getConsoleSize();
        }

        public void start()
        {
            Console.WriteLine("radi");
            draw_init_triangle();
            loop_cut();
        }

        private String toPyramidString(String blocks)
        {
            if (blocks.Length == 1)
            {
                return "▲";
            }

            if (blocks.Length > 1)
            {
                StringBuilder sb = new StringBuilder(blocks);
                sb[0] = '/';
                sb[^1] = '\\';
                blocks = sb.ToString();

            }
            return blocks;
        }

        private void draw_init_triangle()
        {
            int size = Math.Min(main_width/2, main_height);

            this.triangles.Add(new Triangle(0,0,size));

            for (int i = 0; i < size; i++)
            {
                Console.SetCursorPosition(size - i, i);
                Console.WriteLine(toPyramidString(new String('█', i*2)));
            }


        }

        private void loop_cut()
        {
            while (this.triangles.Count > 0)
            {
                this.cutMiddleTriangle(this.triangles.First());
                this.addNextFragments(this.triangles.First());
                this.triangles.RemoveAt(0);

                Console.SetCursorPosition(0, 0);
                Console.Write("Hit enter for next triangle");
                Console.ReadKey();
                Console.SetCursorPosition(0, 0);
                Console.Write(new String(' ', 27));

            }
        }

        private void addNextFragments(Triangle triangle)
        {
            if (triangle.Length <= 6) return;

            int newLength = (int) Math.Round(((double) triangle.Length) / 2);

            triangles.Add(new Triangle(triangle.X + newLength, triangle.Y                       , newLength));
            triangles.Add(new Triangle(triangle.X                       , triangle.Y + newLength, newLength));
            triangles.Add(new Triangle(triangle.X + triangle.Length     , triangle.Y + newLength, newLength));
        }

        private void cutMiddleTriangle(Triangle triangle)
        {
            for (int i = 0; i < triangle.Length/2 + 1; i++)
            {
                Console.SetCursorPosition(triangle.X + triangle.Length - i, triangle.Y + triangle.Length - i);
                Console.WriteLine(new String(' ', i * 2));
            }
        }


    }
}
