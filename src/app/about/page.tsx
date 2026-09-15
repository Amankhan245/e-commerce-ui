export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-4xl">

        <section className="rounded-xl bg-white p-8 text-center shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
            AmanMart
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            About AmanMart
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-600">
            AmanMart is a modern e-commerce platform built to make online
            shopping simple, convenient and reliable.
          </p>
        </section>

        <section className="mt-5 grid gap-4 md:grid-cols-3">

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900">
              Quality
            </h2>

            <p className="mt-2 text-sm leading-5 text-gray-600">
              We focus on providing useful and quality products for everyday
              needs.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900">
              Simple Shopping
            </h2>

            <p className="mt-2 text-sm leading-5 text-gray-600">
              Our goal is to keep product discovery, cart and checkout simple
              and easy to use.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900">
              Secure
            </h2>

            <p className="mt-2 text-sm leading-5 text-gray-600">
              AmanMart includes authentication, secure checkout and order
              management features.
            </p>
          </div>

        </section>

        <section className="mt-5 rounded-xl bg-black p-8 text-center text-white">
          <h2 className="text-2xl font-bold">
            Built with modern web technologies
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-300">
            AmanMart is developed using Next.js, React, Tailwind CSS,
            Node.js, Express.js and MongoDB.
          </p>
        </section>

      </div>
    </main>
  );
}
