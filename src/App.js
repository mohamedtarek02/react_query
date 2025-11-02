import UserData from "./components/User";
import Controller from "./components/Controller";
import Loader from "./components/Loader";

import { useUser, useUsers } from "./hooks/useUsers";

function App() {
  const {
    data: usersData,
    isLoading,
    isError,
    error,
  } = useUsers({ active: true });

  const { data: singleUser } = useUser(1);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="grid grid-cols-4 gap-4 p-8">
            {usersData?.map((user) => (
              <UserData key={user.id} userData={user} />
            ))}
          </div>

          <div className="mt-20 mb-20 mx-auto shadow-md  rounded-lg p-4 text-center bg-[#340a75] w-fit">
            <h2 className="text-white text-2xl mb-4">Single User Data:</h2>
            <p className="text-white">ID: {singleUser?.id}</p>
            <p className="text-white">Name: {singleUser?.name}</p>
          </div>
        </>
      )}
      {isError && <p className="text-center text-red-600">{error}</p>}

      <Controller />
    </>
  );
}

export default App;
