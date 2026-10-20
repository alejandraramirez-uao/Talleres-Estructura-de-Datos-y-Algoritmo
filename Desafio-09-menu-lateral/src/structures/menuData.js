
import { MenuTree } from './MenuTree';

const tree = new MenuTree();

tree.addMenu('Menú principal', 'Inicio', '/');
tree.addMenu('Menú principal', 'Perfil', '/perfil');
tree.addMenu('Menú principal', 'Configuración', '/configuracion');
tree.addMenu('Menú principal', 'Ayuda', '/ayuda');

tree.addMenu('Configuración', 'Seguridad', '/configuracion/seguridad');
tree.addMenu('Configuración', 'Notificaciones', '/configuracion/notificaciones');
tree.addMenu('Configuración', 'Privacidad', '/configuracion/privacidad');

tree.addMenu('Ayuda', 'Preguntas frecuentes', '/ayuda/faq');
tree.addMenu('Ayuda', 'Contacto', '/ayuda/contacto');

export default tree;
