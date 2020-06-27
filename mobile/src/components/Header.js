// @ts-check

import React, {useState} from 'react';

import { Appbar, Menu } from 'react-native-paper';

/**
 * @callback voidCallback
 * @returns {void}
*/

/**
 * @typedef {Object} MenuEntry
 * @property {string} icon
 * @property {string} text
 * @property {voidCallback} action
 */

/**
 * @typedef {Object} HeaderConfig
 * @property {string} title - Title for the header
 * @property {voidCallback} back - Function called when the back button is pressed. If undefined, the back button is not rendered.
 * @property {MenuEntry[]} menu - Menu describing array like [{icon: 'name', text: 'something', action: callback}, ...]
 */

/**
 * Sets the header component for the screen based on a descriptive object according to the HeaderConfig type definition.
 * 
 * @param {*} navigation - Navigation object passed to the screen by React Navigation.
 * @param {HeaderConfig} headerConfig 
 */
export function headerHelper(navigation, headerConfig) {
    navigation.setOptions({
        header: () => <Header {...headerConfig} />
    });
}

/**
 * Simplified header component.
 * 
 * @param {HeaderConfig} props
 */
export default function Header({title, back, menu}) {
    const [menuVisible, setMenuVisible] = useState(false);

    let items = [];
    if (menu) {
        menu.forEach(o => {
            items.push(<Menu.Item key={o.text} icon={o.icon} onPress={o.action} title={o.text} />);
        });
    }
  
    return (
      <Appbar.Header>
        { back && <Appbar.BackAction onPress={back} />}
        <Appbar.Content title={title} />
        {menu && 
            <Menu
                visible={menuVisible}
                onDismiss={()=>setMenuVisible(false)}
                anchor={
                    <Appbar.Action icon='dots-vertical' onPress={()=>setMenuVisible(true)} color='white' />
                }
            >
                {items}
            </Menu>
        }
      </Appbar.Header>
    );
  }