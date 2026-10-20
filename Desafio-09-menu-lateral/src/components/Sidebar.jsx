
import { useState } from 'react';

function MenuItem({ item, level = 0, onNavigate }) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = item.children.length > 0;

  return (
    <li className="menu-item">
      <div
        className={`menu-link ${hasChildren ? 'has-children' : ''}`}
        style={{ paddingLeft: `${16 + level * 16}px` }}
      >
        {hasChildren && (
          <button
            className="toggle"
            onClick={() => setExpanded(!expanded)}
            aria-label={`${expanded ? 'Contraer' : 'Expandir'} ${item.title}`}
          >
            {expanded ? '▾' : '▸'}
          </button>
        )}

        <a
          href={item.link}
          onClick={(event) => {
            event.preventDefault();
            onNavigate(item);
            if (hasChildren) setExpanded(!expanded);
          }}
        >
          {item.title}
        </a>
      </div>

      {hasChildren && expanded && (
        <ul>
          {item.children.map((child) => (
            <MenuItem
              key={child.title}
              item={child}
              level={level + 1}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function Sidebar({ tree, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="marca">
        <div className="marca-icono">N</div>
        <div>
          <h2>NavTree</h2>
          <span>Panel de navegación</span>
        </div>
      </div>

      <p className="menu-titulo">MENÚ PRINCIPAL</p>

      <nav>
        <ul className="lista-menu">
          {tree.root.children.map((item) => (
            <MenuItem
              key={item.title}
              item={item}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
      </nav>

      <div className="sidebar-pie">
        <span className="estado"></span>
        Árbol N-ario activo
      </div>
    </aside>
  );
}

