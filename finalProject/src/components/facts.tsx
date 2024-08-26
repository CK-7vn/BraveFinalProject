import React from 'react';
import { Link } from 'react-router-dom';

export default function Facts() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 ">Facts!</h1>
      <h2 className="text-2xl mb-3">The average person with a bachelors degree earns upwards of 86% more per year than someone only holding a high school diploma.</h2>
      <h3 className="text-xl">That's an average of over 1.2 <p className="underline inline">million</p> dollars over a lifetime!</h3>
      <p className="text-xs">(APLU, 2024)</p>
      <br />
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">The Rising Cost of Traditional College</h2>
        <ul className="list-none pl-5 space-y-2">
          <li>Average cost of college in the US: $15,200 - $29,700  (Hanson, 2024)</li>
          <li>The cost of traditional college has more than doubled in the 21st century! (Hanson,2024)</li>
          <li>It's only getting more expensive, with an annual growht rate of 4.11% (Hanson,2024)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">The Changing Job Market</h2>
        <ul className="list-none pl-5 space-y-2">
          <li>As of 2021 44% of jobs required more than a high school diploma, or GED (Whitford, 2023)</li>
          <li>It is estimated that by 2031 72% of jobs in the US will require postsecondary education and or training (Whitford, 2023)</li>
          <li></li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">With those statistics in mind, one could conclude, it is almost imperative in this day and age that one get a secondary education after high school</h2>
        <p className="text-xl font-semibold mb-5">But! How? With obscene prices, and the rest of your life happening all around you, HOW can you make that leap, and find that success in getting a degree?</p>
        <p className="text-3xl font-bold">By Hacking College!</p>
      </section>

      <Link to="/options" className="text-2xl font-semibold mb-8">Learn more?</Link>
    </div>
  )
}
