class Api::StudentsController < ApplicationController
    wrap_parameters include: Student.attribute_names + ['firstName', 'lastName', 'fullName']

    def index
        @students = Student.all
        render :index
    end

    def show
        @student = Student.find(params[:id])
        render :show
    end

    def create
        @student = Student.new(student_params)

        if @student.save
            render :show
        else
            render json: {errors: @student.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def update
        @student = Student.find(params[:id])

        if @student.update(student_params)
            render :show
        else
            render json: {errors: @student.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def destroy
        @student = Student.find(params[:id])

        if @student
            @student.destroy
            render json: params[:id]
        end
    end

    private
    def student_params
        params.require(:Student).permit(:email, :first_name, :last_name, :full_name, :coach)
    end
end