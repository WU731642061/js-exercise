// 观察者模式 和 发布-订阅模式

// 看了不少文章，有的文章说 发布 + 订阅 = 观察者模式
// 也有的说两者不同，作为菜鸡的我目前还没有办法确定哪个是权威的说法，本文仅仅是基于我目前的认知，写下这篇笔记

// 前一半主要是针对概念的理解，后一般是基于代码的实现

// 观察者模式
// 当对象间存在一对多关系时，则使用观察者模式（Observer Pattern）。比如，当一个对象被修改时，则会自动通知依赖它的对象。观察者模式属于行为型模式。(菜鸟教程的定义)

// 发布-订阅模式
// 从广义上来说，发布 + 订阅 = 观察者模式
// 其目的都是对依赖对象的信息分发，但具体的实现方式稍有不同

// 以下摘自：https://www.zhihu.com/question/23486749
// 发布订阅模式是最常用的一种观察者模式的实现，并且从解耦和重用角度来看，更优于典型的观察者模式
// 在观察者模式中，观察者需要直接订阅目标事件；在目标发出内容改变的事件后，直接接收事件并作出响应
// 在发布订阅模式中，发布者和订阅者之间多了一个发布通道；一方面从发布者接收事件，另一方面向订阅者发布事件；订阅者需要从事件通道订阅事件

// 从上面的定义，可以看到观察者模式中，可能会存在一些缺陷：
// 1、如果一个被观察者对象有很多的直接和间接的观察者的话，将所有的观察者都通知到会花费很多时间。
// 2、如果在观察者和观察目标之间有循环依赖的话，观察目标会触发它们之间进行循环调用，可能导致系统崩溃。
// 3、观察者模式没有相应的机制让观察者知道所观察的目标对象是怎么发生变化的，而仅仅只是知道观察目标发生了变化。

// 抄了一下大佬画的图
// 典型的观察者模式
//  ╭─────────────╮  Fire Event  ╭──────────────╮
//  │             │─────────────>│              │
//  │   Subject   │              │   Observer   │
//  │             │<─────────────│              │
//  ╰─────────────╯  Subscribe   ╰──────────────╯

// 发布-订阅模式 
//  ╭─────────────╮                 ╭───────────────╮   Fire Event   ╭──────────────╮
//  │             │  Publish Event  │               │───────────────>│              │
//  │  Publisher  │────────────────>│ Event Channel │                │  Subscriber  │
//  │             │                 │               │<───────────────│              │
//  ╰─────────────╯                 ╰───────────────╯    Subscribe   ╰──────────────╯

// 相较于观察者模式，发布-订阅模式直接将事件丢给了事件重心，而不用关心是否通知到了每一个监听者

// 接下来看一下在项目中有哪些实际应用
// 先从观察者模式开始

// 主题，状态更新后，将会通知所有的观察者
class Subject {
  constructor() {
    this.state = 0 
    this.observers = []
  }

  getState() {
    return this.state
  }

  setState(newState) {
    this.state = newState
    this.notifyAllObservers()
  }

  attach(observer) {
    this.observers.push(observer)
  }
  
  notifyAllObservers() {
      this.observers.forEach(observer => {
          observer.update()
      })
  }
}

// 观察者，等待被触发
class Observer {
  constructor(name, subject) {
      this.name = name
      this.subject = subject
      this.subject.attach(this)
  }

  update() {
      console.log(`${this.name} update, state: ${this.subject.getState()}`)
  }
}

// 第一步，实例化主题
const subject = new Subject()
// 第二步，实例化观察者，即收集依赖
const observerA = new Observer('a', subject)
// 最后一步，主题事件的触发，通知所有观察者
subject.notifyAllObservers()

// 我个人觉得这种设计模式的实现难点不在于如何其本身函数的实现，而是在于其调度的分配的设计
// 让我们看看另一种形态的观察者模式， eventEmitter
class EventEmitter {
  constructor () {
    // 这里采用new Map的实现方式，在删除事件更加优雅
    this.events = new Map()
  }

  // eventEmitter将会拥有两个核心方法，on和emit，分来用来收集依赖(监听)和通知
  on (type, callback) {
    // 稍微包装一下
    if (typeof callback !== 'function') {
      callback = () => callback
    }
    if (this.events.has(type)) {
      this.events.get(type).push(callback)
    } else {
      this.events.set(type, [callback])
    }
  }

  emit(type) {
    if (this.events.has(type)) {
      const callbackList = this.events.get(type)
      callbackList.forEach(callback => {
        callback.apply(this, arguments)
      })
    }
  }

  delete(type) {
    return this.events.delete(type)
  }
}

// “ 观察者模式：定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新
// 上上面的 Subject 和 Observer， 上面的 type 和 callbacks，就是这种一对多的关系

// 发布-订阅者模式
// 用自己的语言来说，在观察者模式中，主题修改状态后，依然需要自己向观察者们发布更新，那么观察者-主题之间就形成了一种弱耦合关系
// 为了完全摆脱这种耦合，发布-订阅模式抽离了部分发布的逻辑(我们把抽离的这部分称为broker——调度中心)，这样调度中心和发布者和订阅者各自专注于自己的任务即可
class Broker {
  constructor () {
    // 订阅的定语者
    this.subscribers = []
    // 我们定义一个主题，用来被发布者触发
    this.state = 0
  }

  // subscribe 订阅行为
  subscribe(subscriber) {
    this.subscribers.push(subscriber)
  }

  // 更改主题状态
  setState(state) {
    this.state = state;
    // 状态改变后，发布
    this.publish();
  }

  getState() {
    return this.state;
  }

  // 通知所有的订阅者触发更新
  notify() {
    this.subscribers.forEach(subscriber => {
      subscriber.update()
    })
  }
}

// 定义发布者
class Publisher {
  constructor () {}

  // 去更新state，然后触发通知
  changeState(broker, state) {
    broker.setState(state)
  }
}

// 定义订阅者
class Subscriber {
  constructor(name, broker) {
    this.name = name;
    this.broker = broker;
    this.broker.subscribe(this);
  }
  update() {
    console.log(`${this.name}:${this.broker.getState()}`);
  }
}

// 创建调度中心
const broker = new Broker()
// 创建观察者
const publisher = new Publisher()
// 订阅者只需要向调度中心去订阅
const subscriber1 = new Subscriber('a', broker)
// 发布者只关心自己数据的更新，而不需要关心去给谁发布
publisher.changeState(broker, '1')

