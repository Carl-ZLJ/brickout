class Ball {
	constructor(game) {
		this.game = game
		const { image, vertices, w, h } = game.imageByName("ball")
		this.image = image
		this.w = w
		this.h = h
		this.radius = w / 2
		this.x = (game.w - this.w) / 2
		this.y = 500
		this.speedX = 10
		this.speedY = -10
		this.fired = false
		this.vertices = vertices
		this.update(this.vertices, {
			x: this.x,
			y: this.y,
		})
	}

	update(points, origin) {
		this.newPoints = transformVertices(points, origin)
		this.segments = this.segmentsFromVertices(this.newPoints)
	}

	segmentsFromVertices(points) {
		const center = [this.x + this.w / 2, this.y + this.h / 2]
		const segments = []
		for (let i = 0; i < points.length; i++) {
			const p = points[i]
			segments.push([center, p])
		}

		return segments
	}

	fire() {
		this.fired = true
	}

	move() {
		if (this.fired) {
			if (this.x < 0 || this.x + this.w > this.game.w) {
				this.speedX *= -1
			}
			if (this.y < 0 || this.y + this.h > this.game.h) {
				this.speedY *= -1
			}
			// move
			this.x += this.speedX
			this.y += this.speedY
		}
		this.update(this.vertices, {
			x: this.x,
			y: this.y,
		})
	}
}
