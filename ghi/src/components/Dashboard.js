import Nav from "./Nav";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

function Dashboard() {
  const { token } = useAuthContext();

  return (
    <>
      <Nav />
      <div className="px-4 py-5 my-5 text-center">
        <h1 className="display-5 fw-bold">CoopCart</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">Organizing your community's food needs!</p>
        </div>
      </div>
    </>
  );
}

export default Dashboard;

//     <>
//       <div>{token ? <LoggedInContent /> : <LoggedOutContent />}</div>
//     </>
//   );
// }

// const LoggedInContent = () => {
//   <div>
//     <Nav />
//     <div className="px-4 py-5 my-5 text-center">
//       <h1 className="display-5 fw-bold">CoopCart</h1>
//       <div className="col-lg-6 mx-auto">
//         <p className="lead mb-4">Organizing your community's food needs!</p>
//       </div>
//     </div>
//   </div>;
// };

// const LoggedOutContent = () => {
//   return <div>{/* login form  */}</div>;
// };
