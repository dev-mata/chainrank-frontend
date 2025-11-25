'use client';

import Image from 'next/image';
import sportsImg from '../../public/sportsImg.png';
import ecommerceImg from '../../public/commerceImg.png';
import businessImg from '../../public/businessImg.png';
import tradeImg from '../../public/tradeImg.png';
import studentImg from '../../public/studentImg.png';
import socialImg from '../../public/socialImg.png';



export default function Explore() {
  const items = [
    {
      title: 'Sports Picks',
      desc: 'Access top performing sports picks',
      bg: 'bg-green-100',
      color: 'text-green-700',
      img: sportsImg,
    },
    {
      title: 'E-commerce',
      desc: 'Learn the ins and outs of dropshipping',
      bg: 'bg-rose-100',
      color: 'text-rose-700',
      img: ecommerceImg,
    },
    {
      title: 'Business',
      desc: 'Products that help you start and build your business.',
      bg: 'bg-sky-100',
      color: 'text-gray-800',
      img: businessImg,
      fullWidth: true,
    },

    {
      title: 'Trading',
      desc: 'Get expertise insights into what should buy and sell',
      bg: 'bg-gray-100',
      color: 'text-gray-800',
      img: tradeImg,
      fullWidth: true,
    },

    {
      title: 'Students',
      desc: 'Save money and discover study hacks to work less',
      bg: 'bg-red-50',
      color: 'text-gray-800',
      img: studentImg,
      fullWidth: true,
    },

    {
      title: 'Social Media',
      desc: 'Level up your social media game.',
      bg: 'bg-blue-50',
      color: 'text-gray-800',
      img: socialImg,
      fullWidth: true,
    },
  ];

  return (
    <section className="px-4 py-8 max-w-4xl mx-auto">
      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
        Explore the Chain Rank Universe
        <span className="ml-1 w-2 h-2 bg-green-500 inline-block rounded-full" />
      </h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        {items.slice(0, 2).map((item, i) => (
          <div key={i} className={`${item.bg} p-4 flex flex-col items-center text-center`}>
            <h3 className={`text-lg font-bold mb-1 ${item.color}`}>{item.title}</h3>
            <p className="text-sm text-gray-700 mb-4 font-rhm">{item.desc}</p>
            <Image src={item.img} alt={item.title} width={140} />
          </div>
        ))}
      </div>

      {/* Full Width Business Card */}
      <div className={`mt-4 ${items[2].bg} px-6 pt-6 text-center`}>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{items[2].title}</h3>
        <p className="text-sm text-gray-700 mb-4 font-rhm">{items[2].desc}</p>
        <Image src={items[2].img} alt="Business" width={240} className="mx-auto" />
      </div>

      <div className={`mt-4 ${items[3].bg} px-6 pt-6 text-center`}>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{items[3].title}</h3>
        <p className="text-sm text-gray-700 mb-4 font-rhm">{items[3].desc}</p>
        <Image src={items[3].img} alt="Business" width={240} className="mx-auto" />
      </div>


      <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mt-4">
        {items.slice(4, 6).map((item, i) => (
          <div key={i} className={`${item.bg} p-4 flex flex-col items-center text-center`}>
            <h3 className={`text-lg font-bold mb-1 ${item.color}`}>{item.title}</h3>
            <p className="text-sm text-gray-700 mb-4 font-rhm">{item.desc}</p>
            <Image src={item.img} alt={item.title} width={140} />
          </div>
        ))}
      </div>
    </section>
  );
}
