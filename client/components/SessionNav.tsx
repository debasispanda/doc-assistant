import { NavLink } from "react-router";
import { useSessions } from "~/hooks/useSessions";

export const SessionNav = () => {
  const sessions = useSessions();

  return (
    <nav className="h-screen w-70 shrink-0 overflow-y-auto bg-gray-200 p-4 xl:w-100">
      <h2 className="text-lg font-bold mb-4 flex items-center justify-between">
        Chat History
        <NavLink
          to="/"
          end
          className="flex items-center gap-2 block rounded px-3 py-2 text-gray-700 hover:bg-gray-300 hover:text-gray-900 [&.active]:bg-gray-900 [&.active]:text-white"
        >
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
            />
          </svg>
          New Chat
        </NavLink>
      </h2>
      <ul className="list-none">
        {sessions.map((session) => (
          <li key={session.id} className="mb-2">
            <NavLink
              to={session.id === "/" ? "/" : `/${session.id}`}
              end
              className="block rounded px-3 py-2 text-gray-700 hover:bg-gray-300 hover:text-gray-900 [&.active]:bg-gray-900 [&.active]:text-white"
            >
              {session.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
