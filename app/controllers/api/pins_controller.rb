class Api::PinsController < ApplicationController
    wrap_parameters include: Pin.attribute_names + ['userId']

    def index
        @pins = Pin.all
        render :index
    end

    def show
        @pin = Pin.find(params[:id])
        render :show
    end

    def create
        @pin = Pin.new(pin_params)

        if @pin.save
            render :show
        else
            render json: {errors: @pin.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def update
        @pin = Pin.find(params[:id])

        if @pin.update(pin_params)
            render :show
        else
            render json: {errors: @pin.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def destroy
        @pin = Pin.find(params[:id])

        if @pin
            @pin.destroy
            render json: params[:id]
        end
    end

    private
    def pin_params
        params.require(:pin).permit(:user_id, :title, :body)
    end
end