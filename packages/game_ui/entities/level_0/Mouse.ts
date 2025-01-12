import EventEmitter from 'eventemitter3'

export class Mouse extends EventEmitter {
  constructor(target = document.documentElement, options = {}) {
    super()
    this.target = target
    this.options = Object.assign({ 
      useLogger: false, 
      preventDefault: false, 
      boundless: false,
      combinedEvents: {},
      morphCoords: {
        x: (v: number) => v,
        y: (v : number) => v,
        deltaX: (v: number) => v,
        deltaY: (v: number) => v
      }
    }, options)

    this.x = 0
    this.y = 0

    this.pressmap = {
      lmb: false,
      rmb: false,
      wheel: false
    }

    this.listenerTarget = this.options.boundless ? document.documentElement : this.target
    this.listenerTarget.addEventListener('mousedown', this.#mousedownListener.bind(this))
    this.listenerTarget.addEventListener('mouseup', this.#mouseupListener.bind(this))
    this.listenerTarget.addEventListener('mousemove', this.#mousemoveListener.bind(this), { passive: true })
    this.listenerTarget.addEventListener('wheel', this.#wheelListener.bind(this))

    this.emittedEvents = [
      'pressmove',
      'freemove',
      'mousemove',

      'lmb-click',
      'lmb-mousedown',
      'lmb-mouseup',
      'lmb-pressmove',

      'rmb-click',
      'rmb-mousedown',
      'rmb-mouseup',
      'rmb-pressmove',

      'wheel-click',
      'wheel-mousedown',
      'wheel-mouseup',
      'wheel-pressmove',

      'wheel-scroll',
      'wheel-scroll-down',
      'wheel-scroll-up',

      ...Object.keys(this.options.combinedEvents)
    ]

    if (this.options.useLogger) this.#initLogger()

    if (this.options.preventDefault) {
      this.target.addEventListener('contextmenu', event => event.preventDefault())
    }
  }

  #emitEvent(eventName, extendPayload = {}, payload = { x: this.x, y: this.y }) {
    Object.assign(payload, extendPayload)
    if (payload.x) payload.x = this.options.morphCoords.x(payload.x)
    if (payload.y) payload.y = this.options.morphCoords.y(payload.y)
    if (payload.deltaX) payload.deltaX = this.options.morphCoords.deltaX(payload.deltaX)
    if (payload.deltaY) payload.deltaY = this.options.morphCoords.deltaY(payload.deltaY)

    Object.entries(this.options.combinedEvents).forEach(([combinedEventName, value]) => {
        if (value.includes(eventName)) this.emit(combinedEventName, Object.assign(payload, { fromEvent: eventName }))
    })
    if (!this.emittedEvents.includes(eventName)) throw new Error(`Invalid event name ${eventName}`)
    this.emit(eventName, payload)
  }

  #isAnyButtonPressed() {
    return Object.values(this.pressmap).some(isPressed => isPressed)
  }

  #updateCoords(x, y) {
    this.x = x
    this.y = y
  }

  #mousedownListener(event) {
    if (this.options.preventDefault) event.preventDefault()
    this.#updateCoords(event.clientX, event.clientY)
    this.#updatePressmap('mousedown', event.button)
    this.#emitEvent(`${this.#getButtonKeyName(event.button)}-mousedown`)
  }

  #mouseupListener(event) {
    if (this.options.preventDefault) event.preventDefault()
    this.#updateCoords(event.clientX, event.clientY)
    const buttonKeyName = this.#getButtonKeyName(event.button)
    if (this.pressmap[buttonKeyName]) this.#emitEvent(`${buttonKeyName}-click`)
    this.#updatePressmap('mouseup', event.button)
    this.#emitEvent(`${buttonKeyName}-mouseup`)
  }

  #mousemoveListener(event) {
    this.#updateCoords(event.clientX, event.clientY)
    this.#emitEvent('mousemove', { deltaX: event.movementX, deltaY: event.movementY })
    if (!this.#isAnyButtonPressed()) return this.#emitEvent('freemove', { deltaX: event.movementX, deltaY: event.movementY })
    Object.keys(this.pressmap)
    .filter(key => this.pressmap[key])
    .forEach(key => {
      this.#emitEvent('pressmove', { key, deltaX: event.movementX, deltaY: event.movementY })
      this.#emitEvent(`${key}-pressmove`, { deltaX: event.movementX, deltaY: event.movementY })
    })
  }

  #wheelListener(event) {
    const dir = Math.sign(event.deltaY);
    const deltaY = event.deltaY
    this.#emitEvent('wheel-scroll', { deltaY, dir })
    if (dir > 0) this.#emitEvent('wheel-scroll-down', { deltaY, dir })
    if (dir < 0) this.#emitEvent('wheel-scroll-up', { deltaY, dir })
  }

  #updatePressmap(action, buttonIndex) {
    const isPressedMap = { 'mousedown': true, 'mouseup': false }
    this.pressmap[this.#getButtonKeyName(buttonIndex)] = isPressedMap[action]
  }

  #getButtonKeyName(buttonIndex) {
    const map = Object.create(null) 
    map[0] = 'lmb'
    map[2] = 'rmb'
    map[1] = 'wheel'
    return map[buttonIndex]
  }

  #initLogger() {
    for (const eventName of this.emittedEvents) {
      this.on(eventName, (payload) => {
        console.log(`<Mouse:Event:${eventName}>`, JSON.stringify(payload, null, 2))
      })
    }
  }
}