'use strict';

const React  = require('react-native');

const {
  Text,
  StyleSheet,
  TabBarIOS
} = React;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
});

const inbox = require('./img/inbox.png'),
      search = require('./img/search.png');

class AppContainer extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            selectedTab: 'feed'
        };
        //Utility.bind(this, ['delete', 'togglePurchase']);
    }

    render () {
        return (
            <TabBarIOS>
                <TabBarIOS.Item
                    style={styles.container}
                    title="Feed"
                    selected={this.state.selectedTab === 'feed'}
                    icon={inbox}
                    onPress={() => {this.setState({selectedTab: 'feed'});}}
                >
                    <Text style={styles.welcome}>Tab 1</Text>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    style={styles.container}
                    title="Search"
                    selected={this.state.selectedTab === 'search'}
                    icon={search}
                    onPress={()=> this.setState({selectedTab: 'search'})}
                >
                    <Text style={styles.welcome}>Tab 2</Text>
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }
}

module.exports = AppContainer;
