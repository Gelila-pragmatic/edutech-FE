import React, { ReactNode } from "react";

interface LayoutEvenColumnsTwoProps {
  leftColumn: ReactNode;
  rightColumn: ReactNode;
}

const LayoutEvenColumnsTwo: React.FC<LayoutEvenColumnsTwoProps> = ({
  leftColumn,
  rightColumn,
}) => {
  return (
    <>
      {/*<!-- Component: Two columns even layout --> */}
      <section>
        <div className="p-6 m-auto font-rubik xl:max-w-7xl">
          <h2 className="my-4 text-2xl font-medium text-center">
            Pragmatic Text to Json parser.
          </h2>
          <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
            <div className="col-span-4 lg:col-span-6">{leftColumn}</div>
            <div className="flex flex-col h-full col-span-4 p-2 border lg:col-span-6 rounded-xl">
              {rightColumn}
            </div>
          </div>
        </div>
      </section>
      {/*<!-- End Two columns even layout --> */}
    </>
  );
};

export default LayoutEvenColumnsTwo;
