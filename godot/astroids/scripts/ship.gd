extends CharacterBody2D

signal ship_destroyed

@onready var muzzle: Marker2D = $Muzzle
@onready var lazers: Node = $"../Lazers"
@onready var rof_timer: Timer = $RateOfFire

@export var lazer_scene: PackedScene
@export var speed: float = 350.0

var can_shoot = true

func _physics_process(delta: float) -> void:
	var mouse_position = get_global_mouse_position()
	
	if Input.is_action_pressed("move"):
		var direction = (mouse_position - position).normalized()
		velocity += direction * speed * delta
	else:
		velocity.x = move_toward(velocity.x, 0, speed * delta)
		velocity.y = move_toward(velocity.y, 0, speed * delta)
	
	if Input.is_mouse_button_pressed(MOUSE_BUTTON_LEFT) and can_shoot:
		can_shoot = false
		shoot_lazer()
		rof_timer.start()

	look_at(mouse_position)
	move_and_slide()

func shoot_lazer():
	var lazer = lazer_scene.instantiate()
	lazer.position = muzzle.global_position
	lazer.look_at(get_global_mouse_position())
	lazer.direction = (get_global_mouse_position() - lazer.position).normalized()
	lazer.add_to_group("lazer")
	lazers.add_child(lazer)

func destroy():
	emit_signal("ship_destroyed")

func _on_rate_of_fire_timeout() -> void:
	can_shoot = true
