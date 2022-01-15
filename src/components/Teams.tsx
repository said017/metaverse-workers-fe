import React from 'react';

import config from '../config/index.json';

const Team = () => {
  const { teams } = config;
  const { title, subtitle } = teams;
  return (
    <div className={`py-12 bg-background`} id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2
            className={`text-base text-primary font-semibold tracking-wide uppercase`}
          >
            {title}
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {subtitle}
          </p>
        </div>

        <div className={`flex flex-wrap flex-col-reverse sm:flex-row`}>
          <div className={`w-full sm:w-1/2 p-6`}>
            <img className="h-6/6" src={teams.img} alt={teams.title} />
          </div>
          <div className={`w-full sm:w-1/2 p-6 mt-20`}>
            <div className={`align-middle`}>
              <h3
                className={`text-3xl text-gray-800 font-bold leading-none mb-3`}
              >
                {teams.freespace}
              </h3>
              <p className={`text-gray-600 mb-8`}>{teams.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
