import React from 'react';
//apollo config
//base web import
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';
import Routes from './routes/Routes';

const engine = new Styletron();

const App: React.FC = () => {
    return (
        <div>
            <StyletronProvider value={engine}>
                <BaseProvider theme={LightTheme}>
                    <Routes  />
                </BaseProvider>
            </StyletronProvider>
        </div>
    );
};

export default App;