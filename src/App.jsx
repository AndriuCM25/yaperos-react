import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import SendMoneyScreen from './components/SendMoneyScreen';
import SuccessScreen from './components/SuccessScreen';
import SettingsScreen from './components/SettingsScreen';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [screen, setScreen] = useState('home');
  const [transactionData, setTransactionData] = useState(null);

  const handleLogin = (data) => {
    setUserData({
      ...data,
      name: data.name || 'Lucía'
    });
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    setScreen('home');
  };

  const handleNavigate = (screenName) => {
    if (screenName === 'services' || screenName === 'send') {
      setScreen('send');
    } else if (screenName === 'settings') {
      setScreen('settings');
    } else {
      // Para otras acciones, mostrar alert
      alert(`Funcionalidad "${screenName}" próximamente`);
    }
  };

  const handleSend = (data) => {
    setTransactionData(data);
    // Actualizar saldo del usuario
    setUserData(prev => ({
      ...prev,
      balance: prev.balance - parseFloat(data.amount)
    }));
    setScreen('success');
  };

  const handleReset = () => {
    setScreen('home');
    setTransactionData(null);
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="App">
      {screen === 'home' && (
        <HomeScreen 
          onNavigate={handleNavigate} 
          userData={userData}
          onLogout={handleLogout}
        />
      )}
      
      {screen === 'send' && (
        <SendMoneyScreen 
          onNavigate={handleNavigate} 
          onSend={handleSend}
          userData={userData}
        />
      )}
      
      {screen === 'success' && transactionData && (
        <SuccessScreen 
          transactionData={transactionData} 
          onReset={handleReset}
          userData={userData}
        />
      )}

      {screen === 'settings' && (
        <SettingsScreen 
          onNavigate={handleNavigate} 
          onLogout={handleLogout}
          userData={userData}
        />
      )}
    </div>
  );
}

export default App;