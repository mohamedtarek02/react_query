import UserData from "./components/User";
import Controller from "./components/Controller";
import Loader from "./components/Loader";

import { useUser, useUsers, useCreateUser } from "./hooks/useUsers";
import { useRef, useEffect } from "react";

function App() {
  // Fetching all users
  const { data: usersData, isLoading, isError, error } = useUsers();

  // Error handling inside the component if fetching users fails
  useEffect(() => {
    if (isError && error) {
      console.log("Error handled from inside the component", error);
    }
  }, [isError, error]);

  // Data for single user fetched initially
  const { data: singleUser } = useUser({ id: 1, enabled: true });

  // Data for single user disabled initially and fetched on button click
  const { data: anotherUser, refetch } = useUser({ id: 2, enabled: false });
  function fetchSecondUser() {
    refetch();
  }

  // Sending data logic
  // const userName = useRef("");
  // const email = useRef("");

  // const { mutate: createUser } = useCreateUser();

  // const sendDateHandler = () => {
  //   createUser({
  //     name: userName.current.value,
  //     email: email.current.value,
  //   });
  // };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div className="p-4 text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>Error loading users: {error?.message}</p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-4 p-8">
            {usersData?.map((user) => (
              <UserData key={user.id} userData={user} />
            ))}
          </div>

          <div className="mt-20 mb-20 mx-auto shadow-md rounded-lg p-4 text-center bg-[#340a75] w-fit">
            <h2 className="text-white text-2xl mb-4">Single User Data:</h2>
            <p className="text-white">ID: {singleUser?.id}</p>
            <p className="text-white">Name: {anotherUser?.name}</p>
          </div>
        </>
      )}
      {/* <input type="text" ref={userName} />
      <input type="text" ref={email} /> */}
      {/* <button onClick={sendDateHandler}>Send user data</button> */}
      <Controller fetchUser={fetchSecondUser} />
    </>
  );
}

export default App;
