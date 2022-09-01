import { Location, Params, useLocation, useParams } from "react-router-dom";
import { formatTitle } from "utils/Formatting";

export default function useLocationRoute() {
  const location: Location = useLocation();
  const pathname: string = location.pathname;
  const params: Readonly<Params<string>> = useParams();
  const route: string | undefined = params.route;
  const id: string | undefined = params.id;
  const title: string = formatTitle(route);
  const isAdmin: boolean = pathname.includes("admin");

  return { location, pathname, params, route, id, title, isAdmin };
}
