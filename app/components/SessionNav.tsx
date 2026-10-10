import { NavLink } from "react-router";
import { useSessions } from "~/hooks/useSessions";

export const SessionNav = () => {
  const sessions = useSessions();

  return (
    <nav className="h-screen w-70 shrink-0 overflow-y-auto bg-gray-200 p-4 xl:w-100">
      <h2 className="text-lg font-bold mb-4">Chat History</h2>
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
