import { useState } from 'react';
import { connect } from 'react-redux';
import { MenuToggle } from '../../components/Navigation/MenuToggle';
import { MenuList } from '../../components/Navigation/MenuList/MenuList';
import classes from './layout.module.scss';

function LayoutWithoutConnect({isAuthenticated, ...props}) {
  const [menu, setMenu] = useState(false);

  return (
    <div className={classes.Layout}>
      <MenuList
        isOpen={menu}
        onClose={() => setMenu(false)}
        isAuthenticated={isAuthenticated}
      />
      <MenuToggle
        onToggle={() => setMenu(!menu)}
        isOpen={menu}
      />
      <main>
        {props.children}
      </main>
    </div>
  )
};

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.token
});

const Layout = connect(mapStateToProps)(LayoutWithoutConnect);

export { Layout };