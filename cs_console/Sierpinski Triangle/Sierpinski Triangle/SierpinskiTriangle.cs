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

        private void draw_init_triangle()
        {
            int size = Math.Min(main_width/2, main_height);

            this.triangles.Add(new Triangle(0,0,size));

            for (int i = 0; i < size; i++)
            {
                Console.SetCursorPosition(size - i, i);
                Console.WriteLine(new String('█', i*2));
            }


        }

        private void loop_cut()
        {
            while (this.triangles.Count > 0)
            {
                this.cutMiddleTriangle(this.triangles.First());
                this.addNextFragments(this.triangles.First());
                this.triangles.RemoveAt(0);
                Console.ReadKey();
            }
        }

        private void addNextFragments(Triangle triangle)
        {
            if (triangle.Length <= 1) return;

            triangles.Add(new Triangle(triangle.X + triangle.Length/2   , triangle.Y                        , triangle.Length / 2));
            triangles.Add(new Triangle(triangle.X                       , triangle.Y + triangle.Length / 2  , triangle.Length / 2));
            triangles.Add(new Triangle(triangle.X + triangle.Length     , triangle.Y + triangle.Length / 2  , triangle.Length / 2));
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
