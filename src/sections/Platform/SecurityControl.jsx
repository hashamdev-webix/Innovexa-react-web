import securityImage from '../../assets/images/securityPlatform.png';



const Security = () => {
  return (
    <section className="section">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

        <div>
          <h2 className="text-4xl font-bold mb-6">
            Secure & Controlled Visibility
          </h2>

          <ul className="space-y-4 text-[var(--color-gray)]">
            <li>✓ Secure Login</li>
            <li>✓ Encrypted Communication</li>
            <li>✓ Role Based Access</li>
            <li>✓ Activity Tracking</li>
          </ul>
        </div>

        <img
          src={securityImage}
          alt="Security"
          className="rounded-3xl shadow-lg"
        />

      </div>
    </section>
  );
};

export default Security;