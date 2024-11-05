import React from "react";

const CarouselComponent = () => {
  return (
    <div>
      <header>
        <nav className="bg-gray-800 fixed w-full z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex-shrink-0 text-white text-lg font-bold">
                Carousel
              </div>
              <div className="block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Home
                  </a>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Link
                  </a>
                  <a
                    href="#"
                    className="text-gray-300 cursor-not-allowed px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Disabled
                  </a>
                </div>
              </div>
              <form className="mt-2 mt-md-0 flex">
                <input
                  className="form-input px-3 py-2 rounded-md text-gray-900"
                  type="text"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button
                  type="submit"
                  className="ml-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </nav>
      </header>

      <main className="pt-16">
        <div className="relative">
          <div className="carousel">
            <div className="carousel-inner relative w-full overflow-hidden">
              {/* Slide 1 */}
              <div className="carousel-item active relative float-left w-full">
                <img
                  src="https://via.placeholder.com/800x400"
                  className="block w-full"
                  alt="First slide"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                  <div className="text-left text-white">
                    <h1 className="text-4xl font-bold">Example Headline</h1>
                    <p className="mt-4">
                      Cras justo odio, dapibus ac facilisis in, egestas eget
                      quam.
                    </p>
                    <p className="mt-4">
                      <a
                        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
                        href="#"
                      >
                        Sign up today
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Slide 2 */}
              <div className="carousel-item relative float-left w-full">
                <img
                  src="https://via.placeholder.com/800x400"
                  className="block w-full"
                  alt="Second slide"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                  <div className="text-white">
                    <h1 className="text-4xl font-bold">
                      Another example headline.
                    </h1>
                    <p className="mt-4">
                      Cras justo odio, dapibus ac facilisis in, egestas eget
                      quam.
                    </p>
                    <p className="mt-4">
                      <a
                        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
                        href="#"
                      >
                        Learn more
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Slide 3 */}
              <div className="carousel-item relative float-left w-full">
                <img
                  src="https://via.placeholder.com/800x400"
                  className="block w-full"
                  alt="Third slide"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                  <div className="text-right text-white">
                    <h1 className="text-4xl font-bold">
                      One more for good measure.
                    </h1>
                    <p className="mt-4">
                      Cras justo odio, dapibus ac facilisis in, egestas eget
                      quam.
                    </p>
                    <p className="mt-4">
                      <a
                        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
                        href="#"
                      >
                        Browse gallery
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Carousel controls */}
            <a
              href="#"
              className="absolute top-0 bottom-0 left-0 flex items-center justify-center p-0 text-center bg-transparent"
              role="button"
              data-slide="prev"
            >
              <span
                className="carousel-control-prev-icon bg-black/50 p-3 rounded-full"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              href="#"
              className="absolute top-0 bottom-0 right-0 flex items-center justify-center p-0 text-center bg-transparent"
              role="button"
              data-slide="next"
            >
              <span
                className="carousel-control-next-icon bg-black/50 p-3 rounded-full"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>

        {/* Marketing section */}
        <div className="container mx-auto my-12 px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <img
                className="rounded-full mx-auto mb-4"
                src="https://via.placeholder.com/140"
                alt="Placeholder"
                width="140"
                height="140"
              />
              <h2 className="text-xl font-semibold">Heading</h2>
              <p className="mt-2">
                Donec sed odio dui. Etiam porta sem malesuada magna mollis
                euismod.
              </p>
              <p className="mt-4">
                <a
                  className="bg-gray-200 text-black px-6 py-2 rounded-md hover:bg-gray-300"
                  href="#"
                >
                  View details »
                </a>
              </p>
            </div>
            <div className="text-center">
              <img
                className="rounded-full mx-auto mb-4"
                src="https://via.placeholder.com/140"
                alt="Placeholder"
                width="140"
                height="140"
              />
              <h2 className="text-xl font-semibold">Heading</h2>
              <p className="mt-2">
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </p>
              <p className="mt-4">
                <a
                  className="bg-gray-200 text-black px-6 py-2 rounded-md hover:bg-gray-300"
                  href="#"
                >
                  View details »
                </a>
              </p>
            </div>
            <div className="text-center">
              <img
                className="rounded-full mx-auto mb-4"
                src="https://via.placeholder.com/140"
                alt="Placeholder"
                width="140"
                height="140"
              />
              <h2 className="text-xl font-semibold">Heading</h2>
              <p className="mt-2">
                Cras justo odio, dapibus ac facilisis in, egestas eget quam.
              </p>
              <p className="mt-4">
                <a
                  className="bg-gray-200 text-black px-6 py-2 rounded-md hover:bg-gray-300"
                  href="#"
                >
                  View details »
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CarouselComponent;
