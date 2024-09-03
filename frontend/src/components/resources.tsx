export default function Resources() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Resources for Non-Traditional Degrees</h1>
      <section className="mb-8 p-3 rounded-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:hover:bg-gray-800">
        <h2 className="text-2xl font-semibold mb-4">Alternative Credit Providers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border p-4 rounded">
            <h3 className="text-xl font-semibold mb-2">Study.com</h3>
            <p>Offers college courses and CLEP prep. Pricing: $199/month for unlimited courses.</p>
            <a href="https://study.com" className="text-blue-600 hover:underline">Visit Study.com</a>
          </div>
          <div className="border p-4 rounded">
            <h3 className="text-xl font-semibold mb-2">Sophia Learning</h3>
            <p>Provides self-paced online courses. Pricing: $99/month for unlimited courses.</p>
            <a href="https://www.sophia.org" className="text-blue-600 hover:underline">Visit Sophia.org</a>
          </div>
          <div className="border p-4 rounded">
            <h3 className="text-xl font-semibold mb-2">Modern States</h3>
            <p>Offers free CLEP prep courses and exam vouchers.</p>
            <a href="https://modernstates.org" className="text-blue-600 hover:underline">Visit Modern States</a>
          </div>
          <div className="border p-4 rounded">
            <h3 className="text-xl font-semibold mb-2">Saylor Academy</h3>
            <p>Provides free online courses with $5 certificates upon completion.</p>
            <a href="https://www.saylor.org" className="text-blue-600 hover:underline">Visit Saylor.org</a>
          </div>
          <div className="border p-4 rounded">
            <h3 className="text-xl font-semibold mb-2">StraighterLine</h3>
            <p>Offers online college courses. Pricing: $99/month subscription + per-course fees.</p>
            <a href="https://www.straighterline.com" className="text-blue-600 hover:underline">Visit StraighterLine</a>
          </div>
          <div className="border p-4 rounded">
            <h3 className="text-xl font-semibold mb-2">Coursera</h3>
            <p>Provides online courses from universities. Pricing: Varies, some free courses available.</p>
            <a href="https://www.coursera.org" className="text-blue-600 hover:underline">Visit Coursera</a>
          </div>
        </div>
      </section>
      <section className="mb-8 p-3 rounded-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:hover:bg-gray-800">
        <h2 className="text-2xl font-semibold mb-4">Forums and Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border p-4 rounded">
            <h3 className="text-xl font-semibold mb-2">Degree Forum</h3>
            <p>Community forum for discussing non-traditional education paths.</p>
            <a href="https://degreeforum.net" className="text-blue-600 hover:underline">Visit Degree Forum</a>
          </div>
          <div className="border p-4 rounded">
            <h3 className="text-xl font-semibold mb-2">College Hacked</h3>
            <p>Blog with tips and strategies for hacking your college education.</p>
            <a href="https://collegehacked.com" className="text-blue-600 hover:underline">Visit College Hacked</a>
          </div>
          <div className="border p-4 rounded">
            <h3 className="text-xl font-semibold mb-2">Degree Forum Wiki</h3>
            <p>Comprehensive wiki on non-traditional education methods.</p>
            <a href="https://degreeforum.miraheze.org/wiki" className="text-blue-600 hover:underline">Visit Degree Forum Wiki</a>
          </div>
        </div>
      </section>
      <section className="mb-8 p-3 rounded-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:hover:bg-gray-800">
        <h2 className="text-2xl font-semibold mb-4">Miscellaneous Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border p-4 rounded">
            <h3 className="text-xl font-semibold mb-2">American Council on Education (ACE)</h3>
            <p>Provides credit recommendations for various learning experiences.</p>
            <a href="https://www.acenet.edu" className="text-blue-600 hover:underline">Visit ACE</a>
          </div>
          <div className="border p-4 rounded">
            <h3 className="text-xl font-semibold mb-2">College Board</h3>
            <p>Offers CLEP exams and other college planning resources.</p>
            <a href="https://www.collegeboard.org" className="text-blue-600 hover:underline">Visit College Board</a>
          </div>
          <div className="border p-4 rounded">
            <h3 className="text-xl font-semibold mb-2">Sample hacked degree paths</h3>
            <p>List of example "hacked" degree paths hosted on the Degree Forum Wiki!</p>
            <a href="https://degreeforum.miraheze.org/wiki/Category:Degree_Plans" className="text-blue-600 hover:underline">Degree Paths!</a>
          </div>
        </div>
      </section>
    </div>
  );
}
