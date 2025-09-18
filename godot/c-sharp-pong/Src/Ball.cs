using Godot;

public partial class Ball : Area2D
{
    private readonly Vector2 InitalBallPosition = new Vector2(640, 360);

    private Vector2 VelocityVector;
    private float VelocityMagnitude = 300f;

    private AudioStreamPlayer BounceSound;

    // Called when the node enters the scene tree for the first time.
    public override void _Ready()
    {
        VelocityVector = GetRandomVelocityVector();

        BounceSound = GetNode<AudioStreamPlayer>("BounceSound");
    }

    public void UpdateBallPosition(double delta)
    {
        Position += VelocityVector * VelocityMagnitude * (float)delta;
    }

    public void BounceFromWall()
    {
        BounceSound.Play();
        VelocityVector = new Vector2(VelocityVector.X, -VelocityVector.Y);
    }

    public void BounceFromPaddle()
    {
        BounceSound.Play();
        VelocityVector = new Vector2(-VelocityVector.X, VelocityVector.Y);
    }

    public void ResetBall()
    {
        Position = InitalBallPosition;
        VelocityVector = GetRandomVelocityVector();
    }

    private Vector2 GetRandomVelocityVector()
    {
        float velocityAngle = (float)GD.RandRange(-Mathf.Pi / 4, Mathf.Pi / 4);
        if (GD.Randf() < 0.5f)
        {
            velocityAngle += Mathf.Pi;
        }

        return Vector2.FromAngle(velocityAngle).Normalized();
    }
}
