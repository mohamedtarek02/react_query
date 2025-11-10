import UserData from "./components/User";
import Controller from "./components/Controller";
import Loader from "./components/Loader";

import { useUser, useUsers, useCreateUser } from "./hooks/useUsers";
import { useRef, useEffect } from "react";

function App() {
  // Fetching all users
  const { data: usersData, isLoading, isError, error } = useUsers();

  // Error handling inside the component if fetching all users fails
  useEffect(() => {
    if (usersData) {
      alert("Users data fetched successfully");
    } else if (isError && error) {
      console.log("Error handled from inside the component", error);
    }
  }, [isError, error, usersData]);

  // Data for single user fetched initially
  const { data: singleUser } = useUser(1);

  // Data for single user disabled initially and fetched on button click
  const {
    data: anotherUser,
    refetch,
    isLoading: isAnotherUserLoading,
  } = useUser(2, false);

  async function fetchSecondUser() {
    const { data } = await refetch();
    console.log({ data });
  }

  // Sending data logic
  const userName = useRef(null);
  const email = useRef(null);

  const { mutate: createUser, data: addedUserData } = useCreateUser();

  const sendDateHandler = () => {
    if (!userName.current.value || !email.current.value) {
      alert("Please provide both name and email");
      return;
    }

    const payload = {
      name: userName.current.value,
      email: email.current.value,
    };

    // Pass payload to the mutation and clear inputs on success
    createUser(payload, {
      onSuccess: () => {
        userName.current.value = "";
        email.current.value = "";
      },
      onError: (err) => {
        console.log("Failed to create user", err);
      },
      onSettled: () => {
        console.log("Mutation finished (success or error)");
      },
    });
  };

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
            <p className="text-white">
              Name: {isAnotherUserLoading ? "Loading" : anotherUser?.name}
            </p>
          </div>
        </>
      )}
      <div className="flex flex-col gap-4 w-[200px]">
        <input type="text" ref={userName} className="text-black" />
        <input type="text" ref={email} className="text-black" />
        <p> {addedUserData?.id}</p>
        <button onClick={sendDateHandler}>Send user data</button>
      </div>
      <Controller fetchUser={fetchSecondUser} />
    </>
  );
}

export default App;
