/**
 * @description This is the request component page for our mobile view
 *              Takes the right request panel display on large screens
 * @returns A Request component
 */

import RequestPanel from "./components/RightPanelRequests";

const MobileRequest = () => {
  return (
    <div>
      <RequestPanel />
    </div>
  );
};

export default MobileRequest;
