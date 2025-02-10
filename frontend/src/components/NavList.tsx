import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router';

interface Props {
  paths: { link: string; name: string }[];
}

function NavList({ paths }: Props) {
  return (
    <>
      {paths.map((path, index) => (
        <Nav.Item key={index}>
          <NavLink to={path.link} className={({ isActive }) => (isActive ? 'active' : '')}>
            {({ isActive }) => (
              <Nav.Link as="span" active={isActive}>
                {path.name}
              </Nav.Link>
            )}
          </NavLink>
        </Nav.Item>
      ))}
    </>
  );
}

export { NavList };
