from flask import Flask, request, jsonify
from datetime import datetime


def validate_date(date):
    try:
        return datetime.strptime(date, "%d-%m-%Y")
    except ValueError:
        return None


app = Flask(__name__)

tasks = []
counter = 1


@app.route('/tasks', methods=['POST'])
def add_task():
    global counter

    data = request.get_json()
    title = data.get("title")
    description = data.get("description")
    deadline = data.get("deadline")
    deadline_date = validate_date(deadline)

    if not title or not description or not deadline:
        return jsonify({"error": "Отсутствуют заголовок, описание или дедлайн"}), 400

    if not deadline_date:
        return jsonify({"error": "Неверный формат даты. Используйте формат: дд-мм-гг"}), 400

    task = {
        "id": counter,
        "title": title,
        "description": description,
        "deadline": deadline_date
    }

    tasks.append(task)
    counter += 1

    return jsonify(task), 201


@app.route('/tasks', methods=['GET'])
def get_tasks():
    sorted_tasks = sorted(tasks, key=lambda task: task["deadline"])
    return sorted_tasks


@app.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    global tasks
    if len(tasks) < 1:
        return jsonify({"error": "Список заданий пуст. Нельзя удалить задание"}), 400
    tasks = list(filter(lambda task: task["id"] != id, tasks))
    return jsonify({"message": f'Задача {id} успешно удалена!'})


app.run(debug=False)


# Для хранения данных используется список tasks, так как
# это удобный способ динамично добавлять и удалять элементы.
# Каждая конкретная задача представлена в виде словаря с полями
# id, title, description, deadline, что позволяет удобно хранить
# и манипулировать данными.

# Для улучшения проекта в продакшене, я бы добавила базы данных,
# чтобы задачи сохранялись между запусками приложения, а не хранились в памяти.
# Кроме того, можно улучшить обработку ошибок, а также добавить аутентификацию и авторизацию.
# В реальном проекте необходимо добавить тесты.
