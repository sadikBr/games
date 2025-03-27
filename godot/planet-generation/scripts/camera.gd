extends Camera3D

@export var radius: int = 30:
	set(new_radius):
		radius = new_radius
@export var theta: float = PI / 2.0:
	set(new_theta):
		theta = new_theta
@export var phi: float = 0.0:
	set(new_phi):
		phi = new_phi

func calc_camera_position(r, t, p) -> Vector3:
	var x = r * sin(t) * cos(p)
	var z = r * sin(t) * sin(p)
	var y = r * cos(t)
	
	return Vector3(x, y, z)

func set_camera_position(r, t, p):
	var camera_position = calc_camera_position(r, t, p)
	position = camera_position
	look_at(Vector3(0, 0, 0))

func _ready() -> void:
	set_camera_position(radius, theta, phi)

func _process(delta: float) -> void:
	set_camera_position(radius, theta, phi)
	
	if Input.is_mouse_button_pressed(MOUSE_BUTTON_LEFT):
		var mouse_velocity = Input.get_last_mouse_velocity() * delta / 100
		phi += mouse_velocity.x
		theta += mouse_velocity.y * -1
		theta = clamp(theta, 0.0001, PI * 0.9999)

	if Input.is_mouse_button_pressed(MOUSE_BUTTON_MIDDLE):
		radius -= 5
		radius = clamp(radius, 13, 30)
	else:
		radius = 30
