/**
 * @description The sub hero section of our landing page
 */

const SubHero = () => {
  return (
    <section className="bg-gray-100">
      <div
        className="
        container mx-auto 
        grid grid-cols-1 
        md:grid-cols-2 
        xl:grid-cols-[1fr_1.3fr_1fr]
        items-center 
        gap-4 
        py-6 px-6 md:px-12
        transition-all duration-500
      "
      >
        {/* Left side - Profile grid */}
        <div className="flex justify-center md:justify-start">
          <div
            className="
            inline-block 
            w-[260px] h-[290px]
            sm:w-[320px] sm:h-[350px]
            md:w-[380px] md:h-[420px]
            xl:w-[400px] xl:h-[400px]
          "
          >
            <img
              src="/subhero/frame.svg"
              alt="profile grid"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Middle - Text + Avatars + stats */}
        <div className="flex flex-col items-center justify-center text-center lg:text-left md:mt-20">
          <h3 className="text-lg xl:ml-auto text-gray-500">
            {" "}
            Build your profile
          </h3>
          <div className="flex flex-wrap justify-center lg:justify-start items-center gap-2">
            <p className="text-gray-500 text-lg"> With real life projects</p>
            <img
              src="/subhero/signature.svg"
              alt=""
              className="w-70 h-[95px]"
            />
          </div>

          {/* 8 million users */}
          <div className="flex justify-center lg:justify-start items-center gap-4 mt-8">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((num) => (
                <img
                  key={num}
                  src={`https://randomuser.me/api/portraits/men/${num + 20}.jpg`}
                  alt="user"
                  className="h-10 md:h-12 w-10 md:w-12 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-xl md:text-2xl">
                8.2M
              </p>
              <p className="text-sm text-gray-500">Active users</p>
            </div>
          </div>
        </div>

        {/* Right side - Activity card */}
        <div className="bg-blue-50 rounded-2xl p-5 md:p-6 shadow-md w-full max-w-sm mx-auto lg:mx-0">
          <h4 className="font-semibold text-gray-800 mb-6 text-lg">Activity</h4>
          <div className="space-y-6">
            {[
              {
                name: "Jennifer Louis",
                time: "1 day ago",
                text: "Project reviewed and has been sent to tim214@gmail.com for approval.",
                img: "/subhero/Ellipse.png",
              },
              {
                name: "Matthew Jonas",
                time: "4h ago",
                text: "Project reviewed and has been sent to tim214@gmail.com for approval.",
                img: "/subhero/Ellipse.png",
              },
            ].map((user, i) => (
              <div key={i} className="flex gap-3">
                <img
                  src={user.img}
                  alt={user.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-gray-800">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.time}</p>
                  <div className="bg-white rounded-lg p-3 mt-2 shadow-sm text-sm text-gray-700">
                    {user.text}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubHero;
