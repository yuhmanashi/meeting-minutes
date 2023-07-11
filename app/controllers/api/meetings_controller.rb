class Api::MeetingsController < ApplicationController
    wrap_parameters include: Meeting.attribute_names + ['userId']

    def index
        @meetings = Meeting.all
        render :index
    end

    def show
        @meeting = Meeting.find(params[:id])
        render :show
    end

    def create
        @meeting = Meeting.new(meeting_params)

        if @meeting.save
            render :show
        else
            render json: {errors: @meeting.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def update
        @meeting = Meeting.find(params[:id])

        if @meeting.update(meeting_params)
            render :show
        else
            render json: {errors: @meeting.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def destroy
        @meeting = Meeting.find(params[:id])

        if @meeting
            @meeting.destroy
            render json: params[:id]
        end
    end

    private
    def meeting_params
        params.require(:meeting).permit(:user_id, :category, :name, :problems, :notes, :email)
    end
end