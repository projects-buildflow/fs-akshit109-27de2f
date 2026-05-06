import DeveloperProfile from "@/components/DeveloperProfile";
import akshit from "../../public/image.jpg";

const TeamPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 px-6 py-16">
      
      {/* Heading */}
      <div className="mb-14 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900">
          Meet Our Team
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          Passionate developers building impactful digital experiences.
        </p>
      </div>

      {/* Team Grid */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <DeveloperProfile
          name="Akshit Jaiswal"
          role="Full Stack Developer"
          image={akshit}
          github="https://github.com/akshit109"
          linkedin="https://linkedin.com/in/akshit109"
        />
      </div>
    </div>
  );
};

export default TeamPage;