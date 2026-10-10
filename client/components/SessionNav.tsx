import { NavLink } from "react-router";
import { EditIcon } from "lucide-react";
import { useSessions } from "~/hooks/useSessions";
import { SessionActions } from "~/components/SessionActions";

export const SessionNav = () => {
  const { sessions, loading, error } = useSessions();

  return (
    <nav className="h-screen w-70 shrink-0 overflow-y-auto bg-gray-200 p-4 xl:w-100">
      <h2 className="text-lg font-bold mb-4 flex items-center justify-between">
        Chat History
        <NavLink
          to="/"
          end
          className="flex items-center gap-2 block rounded px-3 py-2 text-gray-700 hover:bg-gray-300 hover:text-gray-900"
        >
          <EditIcon />
          New Chat
        </NavLink>
      </h2>
      <ul className="list-none">
        {loading && <li>Loading sessions...</li>}
        {error && <li role="alert">{error.message}</li>}
        {sessions.map((session) => (
          <li
            key={session.id}
            className="mb-2 flex items-center justify-between"
          >
            <NavLink
              to={session.id === "/" ? "/" : `/${session.id}`}
              end
              className="block rounded px-3 py-2 text-gray-700 hover:bg-gray-300 hover:text-gray-900 [&.active]:bg-gray-300 [&.active]:text-gray-900"
            >
              {session.title}
            </NavLink>
            <div>
              <SessionActions />
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};
