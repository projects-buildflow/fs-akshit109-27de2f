import Image, { StaticImageData } from "next/image";

type DeveloperProfileProps = {
  name: string;
  role: string;
  image: string | StaticImageData;
  github: string;
  linkedin: string;
};

const DeveloperProfile: React.FC<DeveloperProfileProps> = ({
  name,
  role,
  image,
  github,
  linkedin,
}) => {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

      <div className="relative z-10 flex flex-col items-center">
        
        {/* Profile Image */}
        <div className="relative mb-4">
          <Image
            src={image}
            alt={name}
            width={120}
            height={120}
            className="rounded-full border-4 border-white object-cover shadow-md"
          />

          <div className="absolute inset-0 rounded-full ring-4 ring-blue-400/30 group-hover:ring-purple-400/40 transition-all duration-300"></div>
        </div>

        {/* Name */}
        <h2 className="text-2xl font-bold text-gray-800">
          {name}
        </h2>

        {/* Role */}
        <p className="mt-1 text-sm font-medium tracking-wide text-blue-600 uppercase">
          {role}
        </p>

        {/* Divider */}
        <div className="my-4 h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>

        {/* Social Links */}
        <div className="flex gap-4">
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-300 hover:bg-black hover:text-white"
          >
            GitHub
          </a>

          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 transition-all duration-300 hover:bg-blue-600 hover:text-white"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
};

export default DeveloperProfile;