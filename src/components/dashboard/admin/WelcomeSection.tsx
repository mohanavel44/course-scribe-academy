
interface WelcomeSectionProps {
  userName: string;
}

const WelcomeSection = ({ userName }: WelcomeSectionProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-2">Welcome, {userName}!</h2>
      <p className="text-gray-600">
        Monitor platform performance, manage courses and users, and analyze key metrics.
      </p>
    </div>
  );
};

export default WelcomeSection;
