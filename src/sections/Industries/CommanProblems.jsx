const problems = [
  "Internet & Wi-Fi Issues",
  "Printer & Device Problems",
  "Support Confusion",
  "Recurring Downtime",
];

export default function CommonProblems() {
  return (
    <section className="section bg-white">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">
            Common IT Problems We Help Solve
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {problems.map((problem) => (
            <div key={problem} className="card text-center">

              <h3 className="font-semibold text-lg">
                {problem}
              </h3>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}