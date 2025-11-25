export default function SellPromo() {
  return (
    <section className="bg-red-600 text-white p-10 md:max-w-xl mx-4 md:mx-auto md:my-20 md:rounded-md md:shadow-lg">
      <h2 className="text-4xl font-bold leading-tight mb-2">
        Sell on<br />Chain Rank
      </h2>
      <p className="text-base max-w-md font-rhm mb-8">
        Introduce your community to millions of new customers on our marketplace.
      </p>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 font-rhm">
        <button className="bg-indigo-200 text-black text-md font-bold px-4 py-2 shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] transition duration-150">
          Start selling
        </button>
        <button className="border border-white text-white font-bold px-4 py-2 hover:bg-white hover:text-red-600 transition duration-150">
          Learn more
        </button>
      </div>
    </section>
  );
}
