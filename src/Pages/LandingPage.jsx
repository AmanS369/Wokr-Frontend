import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const LandingPage = () => {
  const isAuthenticated = useSelector(
    (state) => state.reducer.user.isAuthenticated,
  );
  const backgroundImageUrl = "https://source.unsplash.com/1600x900/?abstract";

  return (
    <div
      className="bg-cover bg-center h-screen"
      style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white text-center">
        <h1 className="text-5xl font-extrabold mb-4">
          Welcome to Your Workspace
        </h1>
        <p className="text-lg mb-6">
          Empower your team with collaborative document creation and seamless
          communication.
        </p>
        <Link
          to={isAuthenticated ? "/user/home" : "/login"}
          className="bg-purple-500 text-white px-6 py-3 rounded-md hover:bg-purple-600"
        >
          Get Started
        </Link>
      </div>
      <div className="absolute bottom-0 w-full text-center mb-8 text-white text-opacity-100">
        <p>
          Trusted by teams worldwide for efficient and enjoyable collaboration
        </p>
        {/* Placeholder SVG or Image */}
      </div>
    </div>
  );
};

export default LandingPage;
