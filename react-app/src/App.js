import React from 'react';

function App() {
  const [ wishes, setWishes ] = React.useState([]);
  const [ wishInput, setWishInput ] = React.useState('');

  function handleInputChange(e) {
    setWishInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    addWish();
  }

  function addWish() {
    if (wishInput.trim() != '') {
      setWishes([...wishes, wishInput]);
      setWishInput('');
    }
  }

  function deleteWish(index) {
    const newWishes = wishes.filter((item, idx) => idx != index);
    setWishes(newWishes);
  }

  return (
    <div 
      className='page'
      style={{
        backgroundColor: '#fff',
        fontFamily: 'Inter, Arial, sans-serif',
        minHeight: '100vh',
      }}>
      <div 
        style={{
          // выравниваю контент по центру экрана
          maxWidth: '882px',
          margin: '0 auto',
        }}>
        <h1 
          style={{
            margin: '0 auto',
            padding: '48px 0 37px 0',
            borderBottom: '1px solid rgba(84, 84, 84, .8)',
          }}>
          Список желаний
        </h1>
        <form 
          method='POST' 
          name='wishForm' 
          onSubmit={handleSubmit}
          style={{
            // использую flex containers для удобного позиционирования элементов
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '30px',
          }}>
          <input
            type='text'
            value={wishInput}
            onChange={handleInputChange}
            placeholder='Введите желание'
            style={{
              // использую проценты для определения ширины для адаптивности
              width: '65%',
              border: 'none',
              borderBottom: '1px solid rgb(0, 0, 0, .2)',
              padding: '0',
              fontWeight: '400',
              fontSize: '20px',
              lineHeight: '22px',
              color: '#000',
            }}
          />
          <button 
            type='submit'
            style={{
              width: '30%',
              minHeight: '50px',
              padding: '0',
              backgroundColor: '#000',
              borderRadius: '2px',
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: '18px',
              lineHeight: '22px',
              textAlign: 'center',
              color: '#fff',
              border: 'none',
              cursor: 'pointer'
            }}>
            Добавить
          </button>
        </form>

        <ul 
          style={{
            listStyle: 'none',
            margin: '0',
            marginTop: '80px',
            padding: '0',
            display: 'flex',
            flexDirection: 'column',
            gap: '30px',
          }}>
          {wishes.length == 0 ? (
            <li 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              margin: '0',
              fontSize: '20px',
              lineHeight: '22px',
              color: '#000',
            }}>
              Пока желаний нет
            </li>
          ) : (
            wishes.map((wish, index) => {
              return(
                <li 
                  key={index} 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <div style={{
                    display: 'flex',
                    gap: '10px',
                    maxWidth: '60%',
                    // запрещаю перенос текста на следующую строку, если строка не влазит
                    // в контейнер, скрываю лишний текст
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    <span 
                      style={{
                        margin: '0',
                        fontSize: '20px',
                        lineHeight: '22px',
                        color: '#000',
                      }}>
                      {index+1}.
                    </span>
                    <p 
                      style={{
                        margin: '0',
                        fontSize: '20px',
                        lineHeight: '22px',
                        color: '#000',
                      }}>
                        {wish}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteWish(index)}
                    style={{
                      width: '30%',
                      minHeight: '50px',
                      padding: '0',
                      backgroundColor: '#000',
                      borderRadius: '2px',
                      fontStyle: 'normal',
                      fontWeight: '400',
                      fontSize: '18px',
                      lineHeight: '22px',
                      textAlign: 'center',
                      color: '#fff',
                      border: 'none',
                      cursor: 'pointer'
                    }}>
                    Удалить
                  </button>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;


/*Для адаптации компонента к работе с бэкендом через API, 
нужно добавить несколько запросов. При загрузке компонента GET-запрос на сервер, 
чтобы получить список желаний (useEffect). 
Для добавления нового желания POST-запрос с данными, а сервер возвращает обновленный 
список или информацию о добавленном желании. 
Для удаления желания DELETE-запрос на сервер с нужным идентификатором 
и обновляем список на клиенте после удаления. 
Плюс обработка ошибок */
