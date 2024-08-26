import React from 'react';

export default function Accredit() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">What is accreditation?</h1>

      <section className="mb-8">
        <p className="mb-4">Accreditation is a process of external quality review used to scrutinize colleges, universities and educational programs for quality assurance and quality improvement.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-5xl font-semibold mb-7">Types of Accreditation</h2>
        <h3 className="text-xl font-semibold mb-2">Regional Accreditation</h3>
        <p className="mb-4">Considered the most prestigious and widely recognized form of accreditation. Credits from regionally accredited institutions are more easily transferable.</p>
        <h3 className="text-xl font-semibold mb-2">National Accreditation</h3>
        <p className="mb-4">Often focuses on specific types of colleges, like vocational or religious institutions. Credits may be less transferable to regionally accredited schools.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Types of Credits</h2>

        <h3 className="text-xl font-semibold mb-2">ACE Credits</h3>
        <p className="mb-4">American Council on Education credits are recommendations for college credit for various educational experiences, including workplace training and military service.</p>

        <h3 className="text-xl font-semibold mb-2">CLEP Credits</h3>
        <p className="mb-4">College Level Examination Program credits are earned by passing standardized tests on college-level subjects.</p>

        <h3 className="text-xl font-semibold mb-2">AP Credits</h3>
        <p className="mb-4">Advanced Placement credits are earned through high school AP courses and exams, potentially counting towards college credits.</p>

        <h3 className="text-xl font-semibold mb-2">DSST Credits</h3>
        <p className="mb-4">DANTES Subject Standardized Tests credits are similar to CLEP, offering college credit for demonstrating knowledge in specific subject areas.</p>
      </section>
    </div>
  )
}
