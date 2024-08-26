export default function Bibliography() {
  return (
    <div className="mt-8">

      <h1 className="text-4xl font-bold mb-8">Bibliography</h1>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">References</h2>
        <ul className="list-none space-y-4 p-3 rounded-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:hover:bg-gray-800">
          <li>
            <p>APLU. (2024, July 31). How does a college degree improve graduates' employment and earnings potential? - APLU. https://www.aplu.org/our-work/4-policy-and-advocacy/publicuvalues/employment-earnings/#:~:text=Two%2Dthirds%20of%20bachelor's%20degrees,is%20a%20high%20school%20diploma.</p>
          </li>
          <li>
            <p>COE - Price of attending an undergraduate institution. (n.d.). https://nces.ed.gov/programs/coe/indicator/cua#suggested-citation</p>
          </li>
          <li>
            <p>Hanson, M. (2024, May 28). Average Cost of College [2024]: Yearly tuition + expenses. Education Data Initiative. https://educationdata.org/average-cost-of-college</p>
          </li>
          <li>
            <p>How many people actually need a four-year diploma? (2024, January 30). Higher Ed Dive. https://www.highereddive.com/news/merger-watch-how-many-people-need-four-year-degree/705878/#:~:text=In%20agreement%2C%20the%20Burning%20Glass,2017%20to%2044%25%20in%202021.</p>
          </li>
          <li>
            <p>Wiki, D. F. (2022, February 22). The basic approach - Degree Forum Wiki. Degree Forum Wiki. https://degreeforum.miraheze.org/wiki/The_Basic_Approach</p>
          </li>
        </ul>
      </section>

      <section className="mb-8 p-3 rounded-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:hover:bg-gray-800">
        <h2 className="text-2xl font-semibold mb-4">Additional Resources</h2>
        <p className="mb-4">
          For more information on higher education trends and statistics, consider exploring these additional resources:
        </p>
        <ul className="list-none pl-5 mb-4">
          <li>National Center for Education Statistics (NCES)</li>
          <li>The Chronicle of Higher Education</li>
          <li>Inside Higher Ed</li>
        </ul>
      </section>
    </div>
  );
}
