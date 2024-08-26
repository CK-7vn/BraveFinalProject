import React from "react";
import { Link } from 'react-router-dom'


export default function Home() {
  return (
    <div className="mt-8">
      <h1 className="text-4xl font-bold mb-8">The Changing Landscape of Higher Education</h1>

      <section className="mb-9">
        <h2 className="text-2xl font-semibold mb-4">How college has changed</h2>
        <p className="mb-4">
          Over the past few decades, the landscape of higher education has dramatically shifted.
          Once seen as a path for the elite, college education has become increasingly necessary
          for career success in many fields. However, this shift has come with rising costs and
          changing expectations.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">The Growing Importance of a Degree</h2>
        <p className="mb-4">
          In today's competitive job market, a college degree has become more crucial than ever.
          It often serves as a baseline requirement for many positions, opening doors to higher-paying
          jobs and career advancement opportunities. Beyond the financial benefits, a degree can provide:
        </p>
        <ul className="list-none  pl-5 mb-4">
          <li className="text-xl">Enhanced critical thinking and problem-solving skills</li>
          <li className="text-xl">Expanded professional networks</li>
          <li className="text-xl">Increased adaptability in a rapidly changing job market</li>
          <li className="text-xl">A sense of accomplishment</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">The Challenge: Balancing Cost and Benefit</h2>
        <p className="mb-4">
          While a degree is increasingly important, the rising costs of traditional college education
          have made it challenging for many to pursue higher education. This is where alternative
          approaches to earning a degree become crucial.
        </p>
      </section>

      <p className="text-xl mb-4">
        Interested in learning how to navigate this new landscape and earn your degree efficiently?
      </p>
      <Link to="/options" className="text-xl font-semibold text-blue-600 hover:underline">
        Learn the approach!
      </Link>
    </div>
  );
};
