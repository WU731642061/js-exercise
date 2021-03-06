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

