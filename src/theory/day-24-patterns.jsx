import { TheoryCode } from './components/TheoryTable'

export default function Day24PatternsTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">День 23</h1>
        <p className="theory-subtitle">Паттерны алгоритмических задач</p>
        <p className="theory-date">23 июня 2026</p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Sliding Window</h2>
        <p className="theory-intro">Использовать окно для работы с подмассивом</p>
        <TheoryCode code={`def max_sum_subarray(arr, k):
    window_sum = sum(arr[:k])
    max_sum = window_sum

    for i in range(k, len(arr)):
        window_sum = window_sum - arr[i-k] + arr[i]
        max_sum = max(max_sum, window_sum)

    return max_sum`} language="python" />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Two Pointers</h2>
        <p className="theory-intro">Два указателя с противоположных концов</p>
        <TheoryCode code={`def two_sum(arr, target):
    left, right = 0, len(arr) - 1

    while left < right:
        current_sum = arr[left] + arr[right]
        if current_sum == target:
            return [left, right]
        elif current_sum < target:
            left += 1
        else:
            right -= 1

    return []`} language="python" />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Fast & Slow Pointers</h2>
        <p className="theory-intro">Обнаружение цикла в связном списке</p>
        <TheoryCode code={`def has_cycle(head):
    slow = fast = head

    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

        if slow == fast:
            return True

    return False`} language="python" />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Рекурсия + Мемоизация</h2>
        <TheoryCode code={`def fib(n, memo={}):
    if n in memo:
        return memo[n]

    if n <= 1:
        return n

    memo[n] = fib(n-1, memo) + fib(n-2, memo)
    return memo[n]`} language="python" />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Как решать задачи на собеседовании</h2>
        <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '13px' }}>
          <li>Поймиляй задачу (спроси примеры)</li>
          <li>Обсуди подход (не сразу пиши код)</li>
          <li>Напиши решение (медленно и четко)</li>
          <li>Тест на примерах</li>
          <li>Обсуди Big O</li>
          <li>Спроси можно ли оптимизировать</li>
        </ol>
      </section>

      <section className="theory-section theory-section--closing">
        <p className="theory-closing-text">Паттерны повторяются! Выучи и побеждай! 🎯</p>
      </section>
    </div>
  )
}
