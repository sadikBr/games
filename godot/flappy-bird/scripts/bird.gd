extends CharacterBody2D

const SPEED = 300.0
const FLY_VELOCITY = -400.0

func _physics_process(delta: float) -> void:
	# Add the gravity.
	if not is_on_floor():
		velocity += get_gravity() * delta

	# Handle jump.
	if Input.is_action_just_pressed("ui_up") and not is_on_floor() and velocity.y > 0:
		set_rotation(-45)
		velocity.y = FLY_VELOCITY
		
	if Input.is_action_just_released("ui_up"):
		set_rotation(0)
	
	move_and_slide()
